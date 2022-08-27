import React from "react";
// import { PureComponent } from "react";

import { BarChart, Bar, XAxis, YAxis, ReferenceLine, LabelList, Cell } from 'recharts';
import { contentColors } from "../Data/contentColors";
import { Heading } from "monday-ui-react-core"


export default class YearOverviewGraph extends React.Component {

    render() {

        // TODO: n-1 problem
        let targets = this.props.targets ? this.props.targets : [];

        let width = this.props.width;
        let height = this.props.height;

        let fillColors = [contentColors["dark-red"], contentColors["grass_green"], contentColors["american_gray"]]

        let current = this.props.currentEmission;
        let neutralized = this.props.currentNeutralized;
        let net = this.props.netEmission;
        let limit = this.props.limitEmission;

        let data = [
            { name: 'Emissions', value: current, range: [0, current] },
            { name: 'Offsetted', value: neutralized, range: [current - neutralized, current] },
            { name: 'Net Emissions', value: net, range: [0, net] }
        ]

        let axisMaxValue = Math.max(limit, current);

        return (
            <>
                <BarChart layout="vertical" width={width ? width : 400} height={(height ? height : 150)-40} data={data} barCategoryGap={-1}>
                    <YAxis type="category" dataKey="name" width={100} />
                    <XAxis type="number" domain={["dataMin", dataMax => axisMaxValue]}
                        tickFormatter={(tick) => {
                            return `${Math.round(tick / limit * 100)}%`;
                        }} />
                    <ReferenceLine x={limit}></ReferenceLine>
                    <Bar dataKey="range" fill="#8884d8">
                        {
                            data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={fillColors[index]} />
                            ))
                        }
                        <LabelList dataKey="value" position="right" />
                    </Bar>
                </BarChart>
            </>
        );
    }
}
