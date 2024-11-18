import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { decrement, increment, incrementByAmount } from '../features/counterSlice';

const Counter = () => {

  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Counter : {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>Increment By 5</button>
    </div>
  )
}

export default Counter