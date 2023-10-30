import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import Todo from './Todo';

const testTodo = {
  _id: "617fe2ca9d79a372105c815e",
  text: "test",
  done: false
};

describe('Test single Todo component', () => {
  it('Component shows correct result', async () => {
    const onClickDelete = jest.fn();
    const onClickComplete = jest.fn();

    render(<Todo todo={testTodo} onClickDelete={onClickDelete} onClickComplete={onClickComplete} />);

    expect(screen.getByText('test')).toBeDefined();
  });

  it('Component status can be changed', async () => {
    const onClickDelete = jest.fn();
    const onClickComplete = jest.fn();

    render(<Todo todo={testTodo} onClickDelete={onClickDelete} onClickComplete={onClickComplete} />);

    await fireEvent.click(screen.getByText('Set as done'));
    expect(onClickComplete.mock.calls).toHaveLength(1);
  });

  it('Component can be deleted', async () => {
    const onClickDelete = jest.fn();
    const onClickComplete = jest.fn();

    render(<Todo todo={testTodo} onClickDelete={onClickDelete} onClickComplete={onClickComplete} />);

    await fireEvent.click(screen.getByText('Delete'));
    expect(onClickDelete.mock.calls).toHaveLength(2);
  });
});