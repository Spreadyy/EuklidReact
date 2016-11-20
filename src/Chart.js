import React from 'react';
import Measure from 'react-measure';
import Obelisk from 'obelisk.js';
import Color from 'coffee-colors';

class Chart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dimensions: {
				width: -1,
				height: -1
			}
		};
	}

	//from http://stackoverflow.com/questions/12875486/what-is-the-algorithm-to-create-colors-for-a-heatmap
	heatMapColorforValue(value) {
		value = value.toFixed(2);
		let h = (1.0 - value) * 240;
		let color = new Color("hsl(" + Math.round(h) + ", 100%, 50%)");
		let hexColor = color.to('hex');
		return parseInt(hexColor.substr(1), 16);
	}

	updateCanvas(width, height) {
		if (!this.refs.canvas) {
			return;
		}
		if (!this.props.data) {
			return;
		}

		this.heatMapColorforValue(0.4);

		var pointY = width / 2;
		var pointX = height - 5;

		const canvas = this.refs.canvas;
		const context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);

		let point = new Obelisk.Point(pointY, pointX);
		let pixelView = new Obelisk.PixelView(canvas, point);

		const data = this.props.data;
		const max = Math.max.apply(this, data.map((xRow) => {
			return Math.max.apply(this, xRow)
		}));

		for (let x = data.length; x > 0; x--) {
			let xRow = data[x - 1];
			for (let y = xRow.length; y > 0; y--) {
				let value = xRow[y - 1];

				let height = value * 5;
				let dimension = new Obelisk.CubeDimension(10, 10, height);

				let colorValue = value / max;
				let color = new Obelisk.CubeColor().getByHorizontalColor(this.heatMapColorforValue(colorValue));
				let cube = new Obelisk.Cube(dimension, color, false);
				let p3d = new Obelisk.Point3D(
					-x * 11,
					-y * 11,
					0
				);
				pixelView.renderObject(cube, p3d);
			}
		}
	}

	render() {
		const canvasWidth = this.state.dimensions.width;
		const canvasHeight = Math.round(this.state.dimensions.width * 0.55);
		this.updateCanvas(canvasWidth, canvasHeight);
		return (
			<Measure
				onMeasure={(dimensions) => {
					this.setState({dimensions});
				}}>
				<div>
				<canvas
					width={canvasWidth}
					height={canvasHeight}
					ref="canvas"
					style={{ maxWidth: '100%' }}></canvas>
					</div>
			</Measure>
		);
	}
}

export default Chart;