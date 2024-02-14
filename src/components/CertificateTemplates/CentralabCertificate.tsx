import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

// Create styles

const tw = createTw({});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={tw("flex flex-col m-10")}>
      <View style={tw("flex")}>
        <View style={tw("flex flex-grow justify-start")}>
          <Image src="../../../centralab.png" style={tw("w-72 h-32")} />
        </View>
        <View style={tw("flex flex-grow justify-end")}>
          <Text>Section #2</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default MyDocument;
