import React from "react";
import '@testing-library/jest-dom/extend-expect';
import userEvent from "@testing-library/user-event";
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
    describe('display elements', () => {
        beforeEach(() => {
            // eslint-disable-next-line testing-library/no-render-in-setup
            container = render(<Blog
                    blog={blog}
                    user={user}
                />
            ).container
        })

        test('title is displaying by default', () => {
            const elem = screen.getByText('test-title', {exact: false})
            expect(elem).toBeDefined()
        })

        test('author is displaying by default', () => {
            const elem = screen.getByText('test-author', {exact: false})
            expect(elem).toBeDefined()
        })

        test('likes is not displaying by default', () => {
            const elem = screen.queryByText('test-likes', {exact: false})
            expect(elem).toBeNull()
        })
        test('url is not displaying by default', () => {
            const elem = screen.queryByText('test-url')
            expect(elem).toBeNull()
        })
        test('after click the button url and likes are displayed', async () => {
            const user = userEvent.setup()
            const button = screen.getByText('view')
            await user.click(button)
            const url = screen.getByText('test-url', {exact: false})
            const likes = screen.getByText('test-likes', {exact: false})
            expect(url).toBeDefined()
            expect(likes).toBeDefined()
        })
    })
    describe('Check handlers', () => {
        let container
        const blog = {
            title: 'test-title',
            author: 'test-author',
            url: 'test-url',
            likes: 'test-likes',
            user: [{username: 'test-username'}],
        }
        const user = {username: 'test-username'}

        test('when like button is clicked twice, the event handler is called twice.', async () => {
            const mockHandler = jest.fn()
            render(<Blog
                blog={blog}
                user={user}
                handleLikeAdd={mockHandler}
            />)
            const userOne = userEvent.setup()
            const buttonView = screen.getByText('view')
            await userOne.click(buttonView)

            const button = screen.getByText('like')
            await userOne.click(button)
            await userOne.click(button)
            expect(mockHandler.mock.calls).toHaveLength(2)
        })

    })

})