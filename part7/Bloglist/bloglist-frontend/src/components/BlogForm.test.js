import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

test('BlogForm correctly use event handler', async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();
  const { container } = render(<BlogForm createBlog={createBlog} />);
  const title = container.querySelector("input[name='title']");
  const author = container.querySelector("input[name='author']");
  const url = container.querySelector("input[name='url']");
  const create = screen.getByText('create');

  await user.type(title, 'test');
  await user.type(author, 'test');
  await user.type(url, 'https://localhost:0002');
  await user.click(create);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].author).toBe('test');
  expect(createBlog.mock.calls[0][0].title).toBe('test');
  expect(createBlog.mock.calls[0][0].url).toBe('https://localhost:0002');
});
