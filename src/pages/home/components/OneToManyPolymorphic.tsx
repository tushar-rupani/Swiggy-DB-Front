import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { oneToManyPolymorphic } from '../requests/association.service';
import { AddressType } from '../model/one-to-many-polymorphic';
import { PaginationModel } from '../model';

const OneToManyPolymorphic = () => {
    const [addressData, setAddressData] = useState([]);
    const [rows, setRows] = useState<AddressType[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 2,
    });
    const oneToManyPolymorphicRequest = async (paginationConfig: any) => {
        const data = await oneToManyPolymorphic(paginationConfig);
        if (data) {
            setAddressData(data.address)
            setTotalCount(data.count)
        }
    }
    useEffect(() => {
        oneToManyPolymorphicRequest({ page: paginationModel.page + 1, pageSize: paginationModel.pageSize });
    }, [paginationModel])

    const handlePaginationModelChange = (newPaginationModel: PaginationModel) => {
        setPaginationModel(newPaginationModel)
    }

    useEffect(() => {
        if (addressData && addressData.length > 0) {
            const newRows = addressData.map((address: AddressType) => {
                return {
                    id: address.id,
                    entity_type: address.entity_type,
                    entity_id: address.entity_id,
                    street: address.street,
                    landmark: address.landmark,
                    house_no: address.house_no,
                    city: address.city,
                    zip: address.zip,
                    created_at: address.created_at,
                }
            })
            setRows(newRows)
        }
    }, [addressData])
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID' },
        { field: 'entity_type', headerName: 'Entity Type' },
        { field: 'entity_id', headerName: 'Enitity ID' },
        { field: 'street', headerName: 'Street' },
        { field: 'landmark', headerName: 'Landmark' },
        { field: 'house_no', headerName: 'House NO' },
        { field: 'city', headerName: 'City' },
        { field: 'zip', headerName: 'ZIP' },
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

                In the given scenario, we can establish a polymorphic relationship for the "Address" table. Both the "User" and "Restaurant" entities can have multiple addresses associated with them.

                To implement this polymorphic relationship, we can introduce two additional columns in the "Address" table: "entity_id" and "entity_type".

                The "entity_id" column will store the ID of the user or restaurant that the address belongs to. The "entity_type" column will indicate whether the address belongs to a user or a restaurant.

                By using these columns, we can dynamically associate addresses with either users or restaurants. This approach ensures that multiple addresses can be assigned to a single user or restaurant without duplicating data or requiring separate tables for user and restaurant addresses.            </h4>
        </>
    )
}

export default OneToManyPolymorphic
