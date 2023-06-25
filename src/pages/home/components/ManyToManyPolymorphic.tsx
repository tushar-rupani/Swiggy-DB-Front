import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { manyToManyPolymorphic } from '../requests/association.service';
import { PaginationModel } from '../model';
import { Favourite, FavouriteDB } from '../model/many-to-many-poly';

const ManyToManyPolymorphic = () => {
    const [favouritesData, setFavouritesData] = useState([]);
    const [rows, setRows] = useState<Favourite[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 2,
    });
    const manyToManyPolymorphicRequest = async (paginationConfig: PaginationModel) => {
        const data = await manyToManyPolymorphic(paginationConfig);
        if (data) {
            setFavouritesData(data.order)
            setTotalCount(data.count)
        }
    }
    useEffect(() => {
        manyToManyPolymorphicRequest({ page: paginationModel.page + 1, pageSize: paginationModel.pageSize });
    }, [paginationModel])

    const handlePaginationModelChange = (newPaginationModel: PaginationModel) => {
        setPaginationModel(newPaginationModel)
    }

    useEffect(() => {
        if (favouritesData && favouritesData.length > 0) {
            const newRows = favouritesData.map((fav: FavouriteDB) => {
                return {
                    id: fav.id,
                    favourite_id: fav.favourite_id,
                    favourite_type: fav.favourite_type,
                    created_at: fav.created_at,
                    user: fav.User.username
                }
            })
            setRows(newRows)
        }
    }, [favouritesData])
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID' },
        { field: 'user', headerName: 'Username' },
        { field: 'favourite_id', headerName: 'Fav. ID' },
        { field: 'favourite_type', headerName: 'Fav. Type' },
        { field: 'created_at', headerName: 'Created At' },
    ];

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Box sx={{ height: 250, width: '70%', boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;", background: "#FFF" }}>
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
            <h4 style={{ textAlign: "justify", margin: "2rem", lineHeight: "30px" }}>
                My example demonstrates a many-to-many polymorphic relationship where users can favorite multiple entities of different types, and each entity can be favorited by multiple users.
            </h4>
        </>
    )
}

export default ManyToManyPolymorphic
