
import React, { useState, useEffect } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import useFetch from '../hooks/useFetch';
import "primeflex/primeflex.css";


//The users table component- displays all users
const UsersDataTable=(props) =>{
    const {fetchGet}  = useFetch()
    const [users, setUsers] = useState([])

    
    //fetch all users
    useEffect(() => {
        fetchGet('https://jsonplaceholder.typicode.com/users',setUsers);   
        setLoading(false)         
    },[])


    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');


    //Filters for global search box
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'company.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        email: { value: null, matchMode: FilterMatchMode.IN }
    });

    //Filters all data, is called when the InputText value changes
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        console.log(_filters);
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    //Header of component- Return header with global search box
    const renderHeader = () => {
        return (
            <div className="flex justify-content-start">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };


    const header = renderHeader();
  
    

    return (
        <div className="card inline h-screen overflow-auto ">
            <DataTable value={users} paginator rows={8} dataKey="id" filters={filters} filterDisplay="row" loading={loading}
                    globalFilterFields={['name', 'company.name', 'email']} header={header} emptyMessage="No customers found."
                    selectionMode="single" selection={props.sUser} onSelectionChange={(e) =>props.setSUser(e.value)} 
                    >
                
                
                <Column field="name" header="Name" filter filterPlaceholder="Search by name" style={{ minWidth: '2rem'}} />   
                <Column field="email" header="Email" filter filterPlaceholder="Search by email" style={{ minWidth: '2rem' }} />   
                <Column field="company.name" header="Company"  style={{ minWidth: '2rem' }} />   



            </DataTable>
            
        </div>
    );
}
        
export default UsersDataTable