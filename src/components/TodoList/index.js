import { Col, Row, Input, Button, Select, Tag, Space } from 'antd';
import Todo from '../Todo';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid4 } from 'uuid';
import { useState } from 'react';
// import { addTodo } from '../../redux/actions';
import { todoRemainingSelector } from '../../redux/selectors';
import todoListSlice from './todosSlice';

export default function TodoList() {
  const dispatch = useDispatch();
  const [todoName, setTodoName] = useState('');
  const [priority, setPriority] = useState('Medium');
  const todoList = useSelector(todoRemainingSelector);

  const handleInputChange = (e) => {
    setTodoName(e.target.value)
  }
  const handlePriorityChange = (value) => {
    setPriority(value)
  }
  const handleAddButtonClick = () => {
    dispatch(todoListSlice.actions.addTodo({
      id: uuid4(),
      name: todoName,
      priority: priority,
      completed: false,
    }));

    setTodoName('');
    setPriority('Medium');
  }
  return (
    <Row style={{ height: 'calc(100% - 40px)' }}>
      <Col span={24} style={{ height: 'calc(100% - 40px)', overflowY: 'auto' }}>
        {todoList.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: 20, color: '#888' }}>
            No data matches your search or filter.
          </div>
        ) : (
          todoList.map(todo => (
            <Todo
              key={todo.id}
              id={todo.id}
              name={todo.name}
              priority={todo.priority}
              completed={todo.completed}
            />
          ))
        )}
      </Col>
      <Col span={24}>
        <Space.Compact style={{ display: 'flex' }} compact="true">
          <Input value={todoName} onChange={handleInputChange} />
          <Select value={priority} onChange={handlePriorityChange} defaultValue="Medium">
            <Select.Option value='High' label='High'>
              <Tag color='red'>High</Tag>
            </Select.Option>
            <Select.Option value='Medium' label='Medium'>
              <Tag color='blue'>Medium</Tag>
            </Select.Option>
            <Select.Option value='Low' label='Low'>
              <Tag color='gray'>Low</Tag>
            </Select.Option>
          </Select>
          <Button type='primary' onClick={handleAddButtonClick}>
            Add
          </Button>
        </Space.Compact>
      </Col>
    </Row>
  );
}