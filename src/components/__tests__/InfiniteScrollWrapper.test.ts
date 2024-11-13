import { mount } from '@vue/test-utils';
import InfiniteScrollWrapper from '@/components/InfiniteScrollWrapper.vue';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

describe('InfiniteScrollWrapper', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let wrapper: any;

  // Mock IntersectionObserver
  const observeMock = vi.fn();
  const disconnectMock = vi.fn();

  beforeEach(() => {
    // Mock IntersectionObserver constructor
    global.IntersectionObserver = vi.fn().mockImplementation(() => ({
      observe: observeMock,
      disconnect: disconnectMock,
    }));

    // Mount the component
    wrapper = mount(InfiniteScrollWrapper, {
      props: {
        hasMore: true,
      },
      slots: {
        default: '<div style="height: 500px">Some content</div>',
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('creates IntersectionObserver on mount', () => {
    // The observer should be created on mount
    expect(global.IntersectionObserver).toHaveBeenCalledTimes(1);
  });

  test('emits "onLoadMore" when scrolled to the bottom', async () => {
    const mockIntersectionEntry = { isIntersecting: true };
    const callback = global.IntersectionObserver.mock.calls[0][0];
    callback([mockIntersectionEntry]); // Manually trigger the observer callback

    const emittedEvents = wrapper.emitted('onLoadMore');
    // Check if the "onLoadMore" event was emitted
    expect(emittedEvents).toHaveLength(1);
  });

  test('disconnects the observer when hasMore is false', async () => {
    const wrapper = mount(InfiniteScrollWrapper, {
      props: { hasMore: true }, // Start with `hasMore` as true
    });

    const spy = vi.spyOn(wrapper.vm.observer, "disconnect");

    // Change `hasMore` to false and wait for the effect
    await wrapper.setProps({ hasMore: false });

    // Check if disconnect was called
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('does not emit "onLoadMore" when not intersecting', async () => {

    // Simulate no intersection (not at the bottom)
    const mockIntersectionEntry = { isIntersecting: false };
    const callback = global.IntersectionObserver.mock.calls[0][0];
    callback([mockIntersectionEntry]); // Manually trigger the observer callback
    const emittedEvents = wrapper.emitted('onLoadMore');

    // Check that "onLoadMore" event is not emitted
    expect(emittedEvents).toBeUndefined();
  });
});
