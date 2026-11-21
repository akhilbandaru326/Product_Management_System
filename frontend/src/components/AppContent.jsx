function AppContent() {
    const location = useLocation();

    const hideNavbar =
        location.pathname === "/login" ||
        location.pathname === "/register";

    return (
        <>
            {!hideNavbar && <Navbar />}

            <Routes>
                <Route element={<PublicRoute />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/add-product" element={<AddProduct />} />
                    <Route
                        path="/edit-product/:id"
                        element={<EditProduct />}
                    />
                </Route>
            </Routes>
        </>
    );
}

export default AppContent;