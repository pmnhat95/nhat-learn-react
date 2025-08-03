import { createSelector } from "@reduxjs/toolkit";

export const searchTextSelector = (state) => state.filters.search;
export const statusFilterSelector = (state) => state.filters.status;
export const priorityFilterSelector = (state) => state.filters.priorities;
export const todoListSelector = (state) => state.todoList;

export const todoRemainingSelector = createSelector(
  todoListSelector,
  searchTextSelector,
  statusFilterSelector,
  priorityFilterSelector,
  (todoList, searchText, statusFilter, priorityFilter) => {
    const statusFilterMapping = {
      'All': () => true,
      'Completed': (todo) => todo.completed,
      'Todo': (todo) => !todo.completed
    }
    return todoList.filter((todo) => {
      const matchesSearch = todo.name.toLowerCase().includes(searchText.toLowerCase());
      const matchesStatus = statusFilterMapping[statusFilter](todo);
      const matchesPriority = priorityFilter.length === 0 ? true : priorityFilter.includes(todo.priority);
      return matchesSearch && matchesStatus && matchesPriority;
    })
  }
)