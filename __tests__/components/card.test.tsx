// React
import React from 'react';
// Jest
import { describe, expect, it, jest } from '@jest/globals';
// Testing library
import { render, fireEvent, waitFor } from "@testing-library/react-native";

// components
import Card from '../../src/components/card';

jest.useFakeTimers();

describe('Card', () => {
  it('should render back side of the card', () => {
    const { getByText } = render(
      <Card column={0} isMatched={false} onFlip={jest.fn()} row={0} value={10} />
    );
    expect(getByText("?")).toBeTruthy();
  });

  it('should render front side of the card', async () => {
    const { getByText } = render(
      <Card column={0} isMatched={false} onFlip={jest.fn()} row={0} value={10} />
    );

    await waitFor(() => fireEvent.press(getByText("?")));
    expect(getByText("10")).toBeTruthy();
  });

  it('should not flip if matched', async () => {
    const { getByText } = render(
      <Card column={0} isMatched={true} onFlip={jest.fn()} row={0} value={10} />
    );

    await waitFor(() => fireEvent.press(getByText("?")));
    expect(getByText("?")).toBeTruthy();
  });

  it('should flip back to the back side of the card after 1sec', async () => {
    const { getByText } = render(
      <Card column={0} isMatched={false} onFlip={jest.fn()} row={0} value={10} />
    );

    await waitFor(() => fireEvent.press(getByText("?")));
    expect(getByText("10")).toBeTruthy();

    jest.advanceTimersByTime(1000);
    await waitFor(() => expect(getByText("?")).toBeTruthy());
  });

  it('should only flip back to the front side when pressed', async () => {
    const onFlip = jest.fn();
    const { getByText } = render(
      <Card column={0} isMatched={false} onFlip={onFlip} row={1} value={10} />
    );

    await waitFor(() => fireEvent.press(getByText("?")));
    expect(getByText("10")).toBeTruthy();

    await waitFor(() => fireEvent.press(getByText("10")));
    expect(getByText("10")).toBeTruthy();

    expect(onFlip).toBeCalledTimes(1);
    expect(onFlip).toBeCalledWith(1, 0, 10);
  });
});
