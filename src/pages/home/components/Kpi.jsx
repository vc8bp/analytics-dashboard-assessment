import React, { useState, useEffect, memo } from 'react';

import { Car, Battery, Plug, Percent, Factory, Gauge } from 'lucide-react';

const KpiCard = ({ title, value, icon: Icon }) => {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                    <Icon className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <h3 className="text-2xl font-semibold text-gray-900 mt-1">{value}</h3>
                </div>
            </div>
        </div>
    );
};

function Kpi({ rows }) {
    const [kpis, setKpis] = useState({
        totalVehicles: 0,
        numberOfBEVs: 0,
        numberOfPHEVs: 0,
        percentEligible: '0%',
        topManufacturer: '',
        averageElectricRange: '0',
    });

    useEffect(() => {
        const totalVehicles = rows.length;
        const numberOfBEVs = rows.filter((row) => row["Electric Vehicle Type"]?.includes('BEV')).length;
        const numberOfPHEVs = rows.filter((row) => row["Electric Vehicle Type"]?.includes('PHEV')).length;
        const eligibleVahicals = rows.filter((row) =>
            row["Clean Alternative Fuel Vehicle (CAFV) Eligibility"]?.includes('Eligible')
        ).length;
        const percentEligible = `${((eligibleVahicals / totalVehicles) * 100).toFixed(1)}%`;

        const manufacturerCounts = {};
        rows.forEach((row) => {
            const make = row.Make;
            if (make) {
                manufacturerCounts[make] = (manufacturerCounts[make] || 0) + 1;
            }
        });
        const topManufacturer = Object.entries(manufacturerCounts).reduce((a, b) => (b[1] > a[1] ? b : a), [null, 0])[0];

        const totalElectricRange = rows.reduce((sum, row) => sum + (+row["Electric Range"] || 0), 0);
        const averageElectricRange = (totalElectricRange / totalVehicles).toFixed(1);

        setKpis({
            totalVehicles,
            numberOfBEVs,
            numberOfPHEVs,
            percentEligible,
            topManufacturer,
            averageElectricRange,
        });
    }, [rows]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <KpiCard title="Total Vehicles" value={kpis.totalVehicles} icon={Car} />
            <KpiCard title="Number of BEVs" value={kpis.numberOfBEVs} icon={Battery} />
            <KpiCard title="Number of PHEVs" value={kpis.numberOfPHEVs} icon={Plug} />
            <KpiCard title="Eligible Vehicles" value={kpis.percentEligible} icon={Percent} />
            <KpiCard title="Top Manufacturer" value={kpis.topManufacturer} icon={Factory} />
            <KpiCard title="Average Electric Range" value={`${kpis.averageElectricRange} miles`} icon={Gauge} />
        </div>
    );
}

export default memo(Kpi); 
