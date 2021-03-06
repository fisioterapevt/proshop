import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const SearchBox = ({ history }) => {
	const [keyword, setKeyword] = useState("");

	const submitHandler = (evt) => {
		evt.preventDefault();
		if (keyword.trim()) {
			history.push(`/search/${keyword}`);
		} else {
			history.push("/");
		}
	};
	return (
		<Form onSubmit={submitHandler} inline>
			<Form.Control
				type="text"
				name="q"
				onChange={(evt) => setKeyword(evt.target.value)}
				placeholder="Search Products..."
				className="mr-sm-2 ml-sm-5"
			></Form.Control>
			<Button type="submit" variant="outline-success" className="p-2s">
				Search
			</Button>
		</Form>
	);
};

export default SearchBox;
