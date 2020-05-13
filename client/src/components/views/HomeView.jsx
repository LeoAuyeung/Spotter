import React from "react";
import { Link } from "react-router-dom";

import "./Home.css";

const HomeView = (props) => {
	const photos = [
		"https://caliberstrong.com/wp-content/uploads/2020/04/bench-press-spot.jpg",
		"https://athleticperformancetc.files.wordpress.com/2015/02/adv_benchpress_031.jpg",
		"https://www.muscleandfitness.com/wp-content/uploads/2018/03/1109-lifting-bench-press-spotter.jpg?w=1109",
		"https://upload.wikimedia.org/wikipedia/commons/a/aa/Bench_press_1.jpg",
	];

	const imgs = photos.map((p) => <img src={p}></img>);

	return <div className="container">{imgs}</div>;
};

export default HomeView;
