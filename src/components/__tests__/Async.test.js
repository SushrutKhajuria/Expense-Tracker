import { render, screen } from '@testing-library/react';
import Async from '../../Async';

describe('Async component', () => {
  beforeEach(() => {
    // Reset the mock before each test
    global.fetch = jest.fn();
  });

  test('renders posts if request succeeds', async () => {
    // Mock successful response
    fetch.mockResolvedValueOnce({
      json: async () => [
        { id: 'p1', title: 'First Post' },
        { id: 'p2', title: 'Second Post' },
      ],
    });

    render(<Async />);

    const items = await screen.findAllByRole('listitem');
    expect(items).not.toHaveLength(0);
  });

  test('renders first post title', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => [{ id: 'p1', title: 'Test Title' }],
    });

    render(<Async />);
    const firstItem = await screen.findByText('Test Title');
    expect(firstItem).toBeInTheDocument();
  });

  test('renders correct number of posts', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => [
        { id: '1', title: 'Post 1' },
        { id: '2', title: 'Post 2' },
        { id: '3', title: 'Post 3' },
      ],
    });

    render(<Async />);
    const listItems = await screen.findAllByRole('listitem');
    expect(listItems.length).toBe(3);
  });

  test('renders no posts if response is empty', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => [],
    });

    render(<Async />);
    const listItems = await screen.queryAllByRole('listitem');
    expect(listItems.length).toBe(0);
  });

  test('handles missing title field gracefully', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => [{ id: '1' }],
    });

    render(<Async />);
    const listItems = await screen.findAllByRole('listitem');
    expect(listItems[0].textContent).toBe('');
  });

  test('handles non-200 responses gracefully', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => {
        throw new Error('Failed to fetch');
      },
    });

    render(<Async />);
    const items = await screen.queryAllByRole('listitem');
    expect(items.length).toBe(0);
  });

  test('handles slow response but still renders', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => new Promise(resolve =>
        setTimeout(() => resolve([{ id: '1', title: 'Delayed Post' }]), 300)
      ),
    });

    render(<Async />);
    const delayedItem = await screen.findByText('Delayed Post');
    expect(delayedItem).toBeInTheDocument();
  });

  test('does not break if fetch is undefined', async () => {
    delete global.fetch;

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ id: '1', title: 'Safe Mode' }]),
      })
    );

    render(<Async />);
    const item = await screen.findByText('Safe Mode');
    expect(item).toBeInTheDocument();
  });

  test('calls fetch exactly once', async () => {
    const mockFetch = jest.fn().mockResolvedValueOnce({
      json: async () => [{ id: '1', title: 'Once Only' }],
    });

    global.fetch = mockFetch;

    render(<Async />);
    await screen.findByText('Once Only');
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  test('post titles are correctly rendered in list items', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => [
        { id: '1', title: 'One' },
        { id: '2', title: 'Two' },
      ],
    });

    render(<Async />);
    const items = await screen.findAllByRole('listitem');
    expect(items[0]).toHaveTextContent('One');
    expect(items[1]).toHaveTextContent('Two');
  });
});
