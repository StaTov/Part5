import React from "react";
import '@testing-library/jest-dom/extend-expect';
import {render, screen} from "@testing-library/react";
import Blog from "./Blog";

describe('<Blog/>', () => {

    let container

    const blog = {
        title: 'test-title',
        author: 'test-author',
        url: 'test-url',
        likes: 'test-likes',
        user: [{username: 'test-username'}],
    }
    const user = {username: 'test-username'}

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        container = render(<Blog
            blog={blog}
            user={user}
            />
        ).container
    })





    test('title is exist by default', () => {
        const elem = screen.getByText('test-title', {exact: false})
        expect(elem).toBeDefined()
    } )

    test('author is exist by default', () => {
        const elem = screen.getByText('test-author', {exact: false})
        expect(elem).toBeDefined()
    } )

    test('likes is not exist by default', () => {
        const elem = screen.queryByText('test-likes', {exact: false})
        expect(elem).toBeNull()
    } )
    test('url is not exist by default', () => {
        const elem = screen.queryByText('test-url')
        expect(elem).toBeNull()
    } )

})