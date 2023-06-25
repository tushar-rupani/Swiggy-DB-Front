import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { manyToMany } from '../requests/association.service';
const ManyToManyRestaurant = () => {
    const [restaurantData, setRestaurantData] = useState([]);
    const [rows, setRows] = useState<any>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 2,
    });
    const manyToManyRequest = async (paginationConfig: any) => {
        const data = await manyToMany(paginationConfig);
        if (data) {
            setRestaurantData(data.restaurants)
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
        if (restaurantData && restaurantData.length > 0) {
            const newRows = restaurantData.map((restaurant: any) => {
                const tags = restaurant.Tags.map((tag: any) => {
                    return tag.name
                })
                return {
                    id: restaurant.id,
                    name: restaurant.name,
                    owner: restaurant.owner,
                    tags: tags.join(", ")
                }

            })
            setRows(newRows)
        }
    }, [restaurantData])
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID' },
        { field: 'name', headerName: 'Restaurant Name' },
        { field: 'owner', headerName: 'Owner' },
        { field: 'tags', headerName: 'Tags', maxWidth: 100 },
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
            <h4 style={{ textAlign: "center" }}>One Restaurant Can have Multiple Tags</h4>
        </>
    )
}

export default ManyToManyRestaurant
