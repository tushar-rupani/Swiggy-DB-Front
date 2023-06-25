import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { getUserOrders, getUsers } from '../requests/association.service';
import { User } from '../model/one-to-many.model';
import { Order } from '../model/one-to-one.model';
import { Modal, Typography } from '@mui/material';

const OneToMany = () => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [userData, setUserData] = useState([]);
    const [rows, setRows] = useState<User[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [userOrders, setUserOrders] = useState([]);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 2,
    });
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const oneToMany = async (paginationConfig: any) => {
        const data = await getUsers(paginationConfig);
        if (data) {
            setUserData(data.users)
            setTotalCount(data.count)
        }
    }
    const handleRowClick = async (id: number) => {
        const data = await getUserOrders(id);
        if (data) {
            setUserOrders(data.orders)
        }
        handleOpen();
    }
    useEffect(() => {
        oneToMany({ page: paginationModel.page + 1, pageSize: paginationModel.pageSize });
    }, [paginationModel])

    const handlePaginationModelChange = (newPaginationModel: any) => {
        setPaginationModel(newPaginationModel)
    }

    useEffect(() => {
        if (userData && userData.length > 0) {
            const newRows = userData.map((user: User) => {
                return {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
            })
            setRows(newRows)
        }
    }, [userData])
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID' },
        { field: 'username', headerName: 'Username' },
        { field: 'email', headerName: 'Email' },
    ];

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Box sx={{ height: 250, width: '30%', boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;", background: "#FFF" }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        rowCount={totalCount}
                        pageSizeOptions={[2]}
                        paginationModel={paginationModel}
                        paginationMode="server"
                        onPaginationModelChange={handlePaginationModelChange}
                        onRowClick={(params) => handleRowClick(params.id as number)}
                    />
                </Box>
                <Modal
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box sx={style}>
                        {userOrders.length > 0 ? userOrders.map((order: Order) => (
                            <Typography id="keep-mounted-modal-title" variant="h6" component="h2" >
                                Price: {order.price}{" "}
                                Status: {order.status}{" "}
                                Ordered on: {new Date(order.created_at).toLocaleDateString()}{"\n"}
                            </Typography>
                        )) : "No Orders"}
                    </Box>
                </Modal>
            </div >
            <h4 style={{ textAlign: "justify", margin: "2rem", lineHeight: "30px" }}>
                In the database schema, there is a one-to-many relationship between the "User" and "Order" entities. This implies that a single user can have multiple orders, while each order is associated with only one user. This relationship enables users to place multiple orders within the system, and each order can be traced back to a specific user. It allows for efficient organization and retrieval of order data based on the user who initiated the purchase. This one-to-many relationship is commonly used in e-commerce platforms or any system where users can place multiple orders over time.
            </h4>
        </>
    )
}

export default OneToMany
