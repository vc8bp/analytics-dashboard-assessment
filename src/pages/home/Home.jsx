import React, { useEffect, useState } from "react";
// import FilterBar from "./components/Filter/Filter";
import VehicleDistributionChart from "./components/Charts/VahicalDistribution";
import VehiclesByYearChart from "./components/Charts/VahicalByYear";
import VahicalDestribuition from "./components/Charts/VahicalDestribuition";
import ElectricRangeChart from "./components/Charts/ElectricRangeChart";
import EVYearChart from "./components/Charts/EVYearChart";
import CAFVEligibilityChart from "./components/Charts/CAFVEligibilityChart";
import Kpi from "./components/Kpi";


const HomePage = ({data}) => {


    return (
        <div className="min-h-screen bg-gray-50">
            <main className="p-8">
                <div className="mb-6">
                    {/* <FilterBar /> */}
                </div>

                <Kpi rows={data.rows} />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Growth of EV Over the Years</h2>
                        <EVYearChart data={data.rows} />
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Most PopularEV Manufacturers</h2>
                        <VehiclesByYearChart data={data.rows} />
                    </div>
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Eligibility Status of EV</h2>
                        <CAFVEligibilityChart data={data.rows} />
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">EV Types: BEV vs. PHEV</h2>
                        <VahicalDestribuition data={data.rows} />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Electric Range Distribution of Vehicles</h2>
                        <ElectricRangeChart data={data.rows} />
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Leading Electric Vehicle Manufacturers</h2>
                        <VehicleDistributionChart data={data.rows} />
                    </div>
                </div>
            </main>
        </div>
    );

};

export default HomePage;

