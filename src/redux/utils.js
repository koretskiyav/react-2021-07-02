import { createSelector } from '@reduxjs/toolkit';
import { fulfilled, pending } from './constants';

export const isLoaded = (statusSelector) => (state, props) =>
  statusSelector(state, props) === fulfilled;

export const shouldLoad = (statusSelector) =>
  createSelector(
    statusSelector,
    (status) => status !== pending && status !== fulfilled
  );
