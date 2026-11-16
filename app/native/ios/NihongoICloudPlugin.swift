// Module natif iCloud pour l'appli iOS (Capacitor). Préparé mais PAS ENCORE COMPILÉ NI TESTÉ :
// il le sera quand le projet iOS sera créé (npx cap add ios). Mode d'emploi : docs/sauvegarde-cloud.md.
//
// Le fichier de sauvegarde va dans le conteneur iCloud de l'appli (iCloud Drive, dossier privé de l'appli),
// sur le compte Apple connecté à l'appareil. Côté JavaScript : src/lib/cloud/icloud.ts.

import Foundation
import Capacitor

@objc(NihongoICloudPlugin)
public class NihongoICloudPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "NihongoICloudPlugin"
    public let jsName = "NihongoICloud"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "status", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "save", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "load", returnType: CAPPluginReturnPromise),
    ]

    private let fileName = "nihongo-sauvegarde.json"
    private let iso = ISO8601DateFormatter()

    /// Dossier « Documents » du conteneur iCloud de l'appli (nil si iCloud est coupé).
    /// À appeler hors du fil principal : la première ouverture peut prendre du temps.
    private func backupURL() -> URL? {
        guard let container = FileManager.default.url(forUbiquityContainerIdentifier: nil) else { return nil }
        let folder = container.appendingPathComponent("Documents", isDirectory: true)
        try? FileManager.default.createDirectory(at: folder, withIntermediateDirectories: true)
        return folder.appendingPathComponent(fileName)
    }

    @objc func status(_ call: CAPPluginCall) {
        call.resolve(["available": FileManager.default.ubiquityIdentityToken != nil])
    }

    @objc func save(_ call: CAPPluginCall) {
        guard let json = call.getString("json") else { return call.reject("Contenu manquant") }
        DispatchQueue.global(qos: .utility).async {
            guard let url = self.backupURL() else { return call.reject("iCloud n'est pas disponible") }
            var failure: Error?
            // Coordination : iCloud peut lire ou synchroniser le fichier au même moment.
            NSFileCoordinator().coordinate(writingItemAt: url, options: .forReplacing, error: nil) { target in
                do { try Data(json.utf8).write(to: target, options: .atomic) } catch { failure = error }
            }
            if let failure { return call.reject("Écriture impossible", nil, failure) }
            call.resolve(["modified": self.iso.string(from: Date())])
        }
    }

    @objc func load(_ call: CAPPluginCall) {
        DispatchQueue.global(qos: .utility).async {
            guard let url = self.backupURL() else { return call.reject("iCloud n'est pas disponible") }
            // Sur un nouvel appareil, le fichier peut exister dans iCloud sans être encore téléchargé.
            try? FileManager.default.startDownloadingUbiquitousItem(at: url)
            var result: [String: Any] = [:]
            NSFileCoordinator().coordinate(readingItemAt: url, options: [], error: nil) { source in
                if let data = try? Data(contentsOf: source), let json = String(data: data, encoding: .utf8) {
                    result["json"] = json
                    if let date = (try? source.resourceValues(forKeys: [.contentModificationDateKey]))?.contentModificationDate {
                        result["modified"] = self.iso.string(from: date)
                    }
                }
            }
            call.resolve(result)
        }
    }
}
