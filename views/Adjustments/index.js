import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { Container, Button, Spacer } from '../../component'
import { useBackButton } from '../../hook'
import * as DocumentPicker from 'expo-document-picker'
import * as XLSX from 'xlsx';
import { InventoryTypes } from '../../redux/types'

const Adjustments = () => {
    const [loadingExcel, setLoadingExcel] = useState(false)
    useBackButton()
    const dispatch = useDispatch()

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
                            type: 'xls'
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
                            /* Update state */
                            const headers = data[0]
                            const rows = data.slice(1).map(item => ({
                                [headers[0]]: item[0],
                                [headers[1]]: item[1],
                                [headers[2]]: item[2],
                                [headers[3]]: item[3],
                            }))
                            dispatch({
                                type: InventoryTypes.SET_INVENTORY,
                                payload: rows
                            })
                            setLoadingExcel(false)
                        };
                        reader.onerror = (evt) => {
                            setLoadingExcel(false)
                        }
                        setLoadingExcel(true)
                        reader.readAsBinaryString(f.output[0]);
                    }}
                    title="Importar Productos"
                />
            </Container>
        </Container>
    );
}

export default Adjustments