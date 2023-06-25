import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { getOneToOne } from '../requests/association.service';
import { OneToOneRowData, Order } from '../model/one-to-one.model';
const OneToOne = () => {
    const [orderData, setOrderData] = useState([]);
    const [rows, setRows] = useState<OneToOneRowData[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 2,
    });
    const oneToOne = async (paginationConfig: any) => {
        const data = await getOneToOne(paginationConfig);
        if (data) {
            setOrderData(data.order)
            setTotalCount(data.count)
        }
    }
    useEffect(() => {
        oneToOne({ page: paginationModel.page + 1, pageSize: paginationModel.pageSize });
    }, [paginationModel])

    const handlePaginationModelChange = (newPaginationModel: any) => {
        setPaginationModel(newPaginationModel)
    }

    useEffect(() => {
        if (orderData && orderData.length > 0) {
            const newRows = orderData.map((order: Order) => {
                return {
                    id: order.id,
                    username: order.User.username,
                    price: order.price,
                    payment_status: order.Payment !== null ? order.Payment.status : "CANCELLED",
                    created_at: order.created_at,
                }
            })
            setRows(newRows)
        }
    }, [orderData])
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID' },
        { field: 'username', headerName: 'Username' },
        { field: 'price', headerName: 'Order Amount' },
        { field: 'payment_status', headerName: 'Payment Status', width: 100 },
    ];

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Box sx={{ height: 250, width: '40%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    rowCount={totalCount}
                    pageSizeOptions={[2]}
                    paginationModel={paginationModel}
                    paginationMode="server"
                    onPaginationModelChange={handlePaginationModelChange}
                />

            </Box>
        </div>
    )
}

export default OneToOne
