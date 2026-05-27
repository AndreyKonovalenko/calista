import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { useDeleteBoard } from './boards-api-queries';
import { invariantId } from '../utils/utils';
// Mock dependencies
jest.mock('react-router', () => ({
  useParams: jest.fn(),
}));

jest.mock('./api', () => ({
  __esModule: true,
  default: {
    boards: {
      deleteBoard: jest.fn(),
    },
  },
}));

jest.mock('../utils/utils', () => ({
  invariantId: jest.fn(),
}));

import api from './api'

describe('useDeleteBoard', () => {
  let queryClient: QueryClient;
  let wrapper: ({ children }: { children: React.ReactNode }) => JSX.Element;

  beforeEach(() => {
    queryClient = new QueryClient();
    wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
    jest.clearAllMocks();
  });

  it('should successfully delete board when boardId is provided as string', async () => {
    const mockBoardId = 'board-123';
    
    (useParams as jest.Mock).mockReturnValue({ boardId: mockBoardId });
    (api.boards.deleteBoard as jest.Mock).mockResolvedValue({ success: true });
    (invariantId as jest.Mock).mockImplementation(() => {});
    
    const { result } = renderHook(() => useDeleteBoard(), { wrapper });
    
    act(() => {
      result.current.mutate();
    });
    
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    
    expect(invariantId).toHaveBeenCalledWith(mockBoardId);
    expect(api.boards.deleteBoard).toHaveBeenCalledWith(mockBoardId);
  });
});