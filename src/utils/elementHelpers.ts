import { ServerElement, generateId } from '../types.js';

/**
 * Convert text property to label format for Excalidraw
 * For standalone text elements, keeps text as direct property
 * For other elements (rectangle, ellipse, diamond), converts to label format
 */
export function convertTextToLabel(element: ServerElement): ServerElement {
  const { text, ...rest } = element;
  if (text) {
    // For standalone text elements, keep text as direct property
    if (element.type === 'text') {
      return element;
    }
    // For other elements, convert to label format
    return {
      ...rest,
      label: { text }
    } as ServerElement;
  }
  return element;
}

/**
 * Create a new element with metadata (timestamps, version)
 * @param elementData - Base element data
 * @param id - Optional ID (if not provided, generates new one)
 * @returns ServerElement with metadata
 */
export function createElementWithMetadata(
  elementData: Omit<ServerElement, 'id' | 'createdAt' | 'updatedAt' | 'version'>,
  id?: string
): ServerElement {
  const elementId = id || generateId();
  const element: ServerElement = {
    id: elementId,
    ...elementData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    version: 1
  };
  return element;
}

/**
 * Update element metadata (timestamp, increment version)
 * @param existingElement - Current element state
 * @param updates - Fields to update
 * @returns Updated element with new metadata
 */
export function updateElementWithMetadata(
  existingElement: ServerElement,
  updates: Partial<ServerElement>
): ServerElement {
  return {
    ...existingElement,
    ...updates,
    updatedAt: new Date().toISOString(),
    version: (existingElement.version || 0) + 1
  };
}

/**
 * Batch create elements with metadata
 * @param elementsData - Array of element data
 * @returns Array of ServerElement with metadata
 */
export function batchCreateElementsWithMetadata(
  elementsData: Array<Omit<ServerElement, 'id' | 'createdAt' | 'updatedAt' | 'version'>>
): ServerElement[] {
  return elementsData.map(elementData => createElementWithMetadata(elementData));
}
