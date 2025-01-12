import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AllCommunityModule, ModuleRegistry, provideGlobalGridOptions } from 'ag-grid-community'; 

provideGlobalGridOptions({
    theme: "legacy",
});

ModuleRegistry.registerModules([AllCommunityModule]);

const VehicleTable = ({ data }) => {

    const columnDefs = Object.keys(data[0]).map((key) => {
        let options = { field: key, sortable: true,  filter: true,   resizable: true  }
        if(key == "Clean Alternative Fuel Vehicle (CAFV) Eligibility"){
            options["valueFormatter"] = (params) => {
                const value = params.value;
                console.log({value})
                if (value?.includes("Eligible")) {
                    return "Eligible";
                } else if (value?.includes("Not eligible")) {
                    return "Not eligible";
                }
                return "Unknown";
            };
        }
        return options
    });

    const defaultColDef = {
        sortable: true,
        filter: true,
        resizable: true,
        flex: 1, 
    };

    const gridOptions = {
        pagination: true, 
        paginationPageSize: 10, 
        animateRows: true, 
        rowSelection: "multiple", 
        getRowStyle: (params) => {
            const cafvValue = params.data["Clean Alternative Fuel Vehicle (CAFV) Eligibility"]; 
            console.log({cafvValue})
            if (cafvValue?.includes("Eligible")) {
                return { backgroundColor: "#ff9494",  };
            } else if (cafvValue?.includes("Not eligible")) {
                return { backgroundColor: "#afedaf",  };
            }
            return null;
        }
    };

    return (
        <div className="ag-theme-alpine" style={{height: "calc(100dvh - 60px)", boxSizing: "border-box", padding: "1rem"}} >
            <AgGridReact
                rowData={data}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                gridOptions={gridOptions}
                paginationPageSize={500}
                paginationPageSizeSelector={[200, 500, 1000, 5000]}
                debounceVerticalScrollbar={true}
                sideBar={true}
            />
        </div>
    );
};

export default VehicleTable;
