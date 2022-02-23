import React, { useState } from 'react';
import { Container, Button, Spacer, Text } from '../../component'
import { useBackButton, useHeaderTitle } from '../../hook'
import * as DocumentPicker from 'expo-document-picker'
import * as XLSX from 'xlsx';
import { getDatabase, ref as dbRef, set } from 'firebase/database';


const Adjustments = () => {
    const [loadingExcel, setLoadingExcel] = useState(false)
    useBackButton()
    useHeaderTitle('Ajustes')

    return (
        <Container alignCenter>
            <Spacer.Medium />
            <Container style={{
                width: 240,
                height: 44
            }}>
                <Button.Primary
                    disabled={loadingExcel}
                    onPress={async () => {
                        const f = await DocumentPicker.getDocumentAsync({
                            type: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
                        })

                        const reader = new FileReader();
                        reader.onload = (evt) => { // evt = on_file_select event
                            /* Parse data */
                            const bstr = evt.target.result;
                            const wb = XLSX.read(bstr, { type: 'binary' });
                            /* Get first worksheet */
                            const wsname = wb.SheetNames[0];
                            const ws = wb.Sheets[wsname];
                            /* Convert array of arrays */
                            const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
                            /* Parse rows */
                            const rows = data.slice(1).map(item => ({
                                'category': item[0],
                                'productId': item[1],
                                'description': item[2] || '',
                                'barcode': item[3],
                            }))

                            /* Update Firebase realtime database */
                            const db = getDatabase();
                            for (const row of rows) {
                                const reference = dbRef(db, 'inventory/' + row.barcode);
                                set(reference, row);
                            }
                            setLoadingExcel(false)
                        };
                        reader.onerror = (evt) => {
                            setLoadingExcel(false)
                        }
                        setLoadingExcel(true)
                        reader.readAsBinaryString(f.output[0]);
                    }}
                    title="Importar Excel"
                />
            </Container>
            <Spacer.Medium />
            <Text.Small>Formato: xls, xlsx</Text.Small>
            <Text.Small>Columnas: categoria | codigo | descripcion | barcode</Text.Small>
            <Spacer.Large />
            {/*<Container style={{
                width: 240,
                height: 44
            }}>
                <Button.Primary
                    onPress={async () => {
                        alert('WIP')
                    }}
                    title="Importar Contenful"
                />
                </Container>*/}
        </Container>
    );7791234199198
}

export default Adjustments