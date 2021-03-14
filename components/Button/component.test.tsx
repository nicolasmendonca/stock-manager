import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './index';

const onClickHandler = jest.fn();

describe('Button', () => {
	afterEach(() => {
		onClickHandler.mockClear();
	});
	it('calls the onClick prop when clicked', () => {
		render(
			<Button type="button" onClick={onClickHandler}>
				Submit
			</Button>
		);
		const buttonComponent = screen.getByText(/submit/i);

		fireEvent.click(buttonComponent);
		expect(onClickHandler).toHaveBeenCalledTimes(1);
	});
});
