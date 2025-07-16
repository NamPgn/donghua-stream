import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Định nghĩa kiểu dữ liệu cho item trong lịch sử
interface HistoryItem {
  id: string;
  name: string;
  slug: string;
  thumbnail?: string;
  currentEpisode: string;
  lastWatched: number; // timestamp
}

interface HistoryState {
  history: HistoryItem[];
  addToHistory: (item: HistoryItem) => void;
  removeFromHistory: (id: string) => void;
  clearHistory: () => void;
}

// Tạo store với middleware persist để lưu vào localStorage
export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      history: [],
    
      // Thêm một item vào lịch sử
      addToHistory: (newItem) => {
        set((state) => {
          // Lọc ra item cũ nếu đã tồn tại để cập nhật
          const filteredHistory = state.history.filter(
            (item) => item.slug !== newItem.slug
          );
          
          // Thêm item mới vào đầu mảng
          return {
            history: [newItem, ...filteredHistory].slice(0, 10), // Giới hạn 50 items
          };
        });
      },

      // Xóa một item khỏi lịch sử
      removeFromHistory: (slug) => {
        set((state) => ({
          history: state.history.filter((item) => item.slug !== slug),
        }));
      },

      // Xóa toàn bộ lịch sử
      clearHistory: () => {
        set({ history: [] });
      },
    }),
    {
      name: 'watch-history',
    }
  )
); 