const calcQ = (x, y) => {
	return parseInt(x / y, 10);
}

const calcR = (x, y) => {
	return x % y;
}

const getInitialRow = (x, y) => {
	return ({
		first: true,
		x: x,
		y: y,
		q: calcQ(x, y),
		r: calcR(x, y),
		u: 1,
		s: 0,
		v: 0,
		t: 1
	});
}

const calcNextRow = (x, y, lastRow) => {
	let q = calcQ(x, y);
	let r = calcR(x, y);
	let u, s, v, t;

	u = lastRow.s;
	s = lastRow.u - (lastRow.q * lastRow.s);
	v = lastRow.t;
	t = lastRow.v - (lastRow.q * lastRow.t);

	return ({
		first: false,
		x,
		y,
		q,
		r,
		u,
		s,
		v,
		t
	});
}

export const getRows = (x, y) => {
	let rows = []
	rows.push(getInitialRow(x, y));

	let actualRow = rows[0];

	while (actualRow.r !== 0) {
		actualRow = calcNextRow(actualRow.y, actualRow.r, actualRow);
		rows.push(actualRow);
	}

	return rows;
}