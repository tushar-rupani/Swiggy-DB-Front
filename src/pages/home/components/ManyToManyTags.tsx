import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { manyToManyTag } from '../requests/association.service';
const ManyToManyTag = () => {
    const [tagData, setTagData] = useState([]);
    const [rows, setRows] = useState<any>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 2,
    });
    const manyToManyRequest = async (paginationConfig: any) => {
        const data = await manyToManyTag(paginationConfig);
        if (data) {
            setTagData(data.restaurants)
            setTotalCount(data.count)
        }
    }
    useEffect(() => {
        manyToManyRequest({ page: paginationModel.page + 1, pageSize: paginationModel.pageSize });
    }, [paginationModel])

    const handlePaginationModelChange = (newPaginationModel: any) => {
        setPaginationModel(newPaginationModel)
    }

    useEffect(() => {
        console.log(tagData);

        if (tagData && tagData.length > 0) {
            const newRows = tagData.map((tag: any) => {
                const restaurants = tag.Restaurants.map((restaurant: any) => {
                    return restaurant.name
                })
                return {
                    id: tag.id,
                    name: tag.name,
                    restaurants: restaurants.join(", ")
                }

            })
            setRows(newRows)
        }
    }, [tagData])
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID' },
        { field: 'name', headerName: 'Tag' },
        { field: 'restaurants', headerName: 'Restaurants', maxWidth: 100 },
    ];

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Box sx={{ height: 250, width: '40%', boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;", background: "#FFF" }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        rowCount={totalCount}
                        autoHeight
                        pageSizeOptions={[2]}
                        paginationModel={paginationModel}
                        paginationMode="server"
                        onPaginationModelChange={handlePaginationModelChange}
                    />

                </Box>
            </div>
            <h4 style={{ textAlign: "center" }}>One Tag May Belong to Multiple Restaurant</h4>
        </>
    )
}

export default ManyToManyTag
