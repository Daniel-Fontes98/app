import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import MyDocument from "~/components/CertificateTemplates/CentralabCertificate";

const Teste = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <PDFDownloadLink document={<MyDocument />} fileName="certificate.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download now!"
        }
      </PDFDownloadLink>
      <PDFViewer>
        <MyDocument />
      </PDFViewer>
    </div>
  );
};

export default Teste;
