import React from "react";
import '@testing-library/jest-dom/extend-expect';
import userEvent from "@testing-library/user-event";
import {render, screen} from "@testing-library/react";
import BlogForm from "./BlogForm";

describe('<BlogForm/>', () => {

    test('form calls the right event handler with right details', async () => {
        const addBlog = jest.fn()

        render(<BlogForm addBlog={addBlog}/>)

        const user = userEvent.setup()

        const inputTitle = screen.getByPlaceholderText('title')
        const inputAuthor = screen.getByPlaceholderText('author')
        const inputUrl = screen.getByPlaceholderText('url')
        const sendButton = screen.getByText('create')

        await user.type(inputTitle, 'test-title')
        await user.type(inputAuthor, 'test-author')
        await user.type(inputUrl, 'test-url')

        await user.click(sendButton)

        expect(addBlog.mock.calls).toHaveLength(1)
        expect(addBlog.mock.calls[0][0]).toEqual({
            title: 'test-title',
            author: 'test-author',
            url: 'test-url'
        })
    }, 100000)
})