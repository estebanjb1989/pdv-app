import React, { useState } from "react";
import { Container, Button, Spacer, Text } from "../../component";
import { useBackButton, useHeaderTitle } from "../../hook";
import * as DocumentPicker from "expo-document-picker";
import * as XLSX from "xlsx";
import { getDatabase, ref as dbRef, set } from "firebase/database";

const Adjustments = () => {
  const [loadingExcel, setLoadingExcel] = useState(false);
  useBackButton();
  useHeaderTitle("Ajustes");

  return (
    <Container alignCenter>
      <Spacer.Medium />
      <Container
        style={{
          width: 240,
          height: 44,
        }}
      >
        <Button.Primary
          disabled={loadingExcel}
          onPress={async () => {
            const f = await DocumentPicker.getDocumentAsync({
              type: [
                "application/vnd.ms-excel",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              ],
            });

            const reader = new FileReader();
            reader.onload = (evt) => {
              // evt = on_file_select event
              /* Parse data */
              const bstr = evt.target.result;
              const wb = XLSX.read(bstr, { type: "binary" });
              /* Get first worksheet */
              const wsname = wb.SheetNames[0];
              console.log(wsname);
              const ws = wb.Sheets[wsname];
              /* Convert array of arrays */
              const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
              /* Parse rows */
              const rows = data
                .slice(3)
                .map((item) => {
                  const currIndex = 1;
                  /* 
                  Product	slug	description	barcode	quantity	price	currency
                  LADRILLOS	ladriilo/ladrillo-hueco-1	Ladrillo Hueco 70x35	1111	1000	8000	GS
                  */
                  return {
                    category: item[currIndex],
                    slug: item[currIndex + 1],
                    description: item[currIndex + 2] || "",
                    barcode: item[currIndex + 3],
                    quantity: item[currIndex + 4],
                    unit: item[currIndex + 5],
                    price: item[currIndex + 6],
                    currency: item[currIndex + 7],
                  };
                })
                .filter((row) => !!row.slug);
              /* Update Firebase realtime database */
              const db = getDatabase();
              for (const row of rows) {
                const reference = dbRef(db, "inventory/" + row.slug);
                set(reference, row);
              }
              setLoadingExcel(false);
            };
            reader.onerror = (evt) => {
              setLoadingExcel(false);
            };
            setLoadingExcel(true);
            reader.readAsBinaryString(f.output[0]);
          }}
          title="Importar Inventario"
        />
        <Spacer.Medium />s{" "}
        <Container>
          <Text.TitleH3>Instrucciones</Text.TitleH3>
          <Spacer.Medium />
          <Text.Body>1. Primera fila Encabezados</Text.Body>
          <Spacer.Medium />
          <Text.Body>
            2. El archivo debe llamarse YYYY-mm-dd_NOMBRE_APELLIDO.xls
          </Text.Body>
          <Text.Body>
            Product slug description barcode quantity price currency
          </Text.Body>
          <Text.Body>
            LADRILLOS ladriilo/ladrillo-hueco-1 Ladrillo Hueco 70x35 1111 1000
            8000 GS
          </Text.Body>
        </Container>
      </Container>
    </Container>
  );
};

export default Adjustments;
