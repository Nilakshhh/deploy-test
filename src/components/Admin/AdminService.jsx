import ServiceForm from "./ServiceForm";
import ServiceTable from "./ServiceTable";
import ServiceGroupTable from "./ServiceGroupTable"

function AdminService () {

    return (
        <>
            <ServiceGroupTable />
            <ServiceTable />
            <ServiceForm />
        </>
    );
}

export default AdminService;