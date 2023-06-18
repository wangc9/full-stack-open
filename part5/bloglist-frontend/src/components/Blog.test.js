import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('Blog test', () => {
  let component;
  const deleteBlog = jest.fn();
  const likeBLog = jest.fn();
  const blog = {
    title: 'render test',
    author: 'none',
    url: 'https://test.net',
    likes: 0,
    user: {
      username: 'test',
      name: 'test',
    },
  };
  const user = userEvent.setup();

  beforeEach(() => {
    component = render(
      <Blog blog={blog} deleteBlog={deleteBlog} likeBlog={likeBLog} />,
    );
  });

  test('renders content', () => {
    expect(component.container.querySelector('.init')).toHaveTextContent(blog.title);
    expect(component.container.querySelector('.init')).toHaveTextContent(blog.author);
    expect(component.queryByText(blog.url)).not.toBeInTheDocument();
    expect(component.queryByText('like')).not.toBeInTheDocument();
  });

  test('show url and like after clicking button', async () => {
    const button = screen.getByText('view');
    await user.click(button);

    expect(component.container.querySelector('.detail')).toHaveTextContent(blog.url);
    expect(component.container.querySelector('.detail')).toHaveTextContent(blog.likes);
  });
});
