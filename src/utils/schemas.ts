import { z } from 'zod';
import { EXCALIDRAW_ELEMENT_TYPES, ExcalidrawElementType } from '../types.js';

/**
 * Base schema for Excalidraw element properties
 * Shared across both MCP server and HTTP server
 */
export const BaseElementPropertiesSchema = z.object({
  type: z.enum(Object.values(EXCALIDRAW_ELEMENT_TYPES) as [ExcalidrawElementType, ...ExcalidrawElementType[]]),
  x: z.number(),
  y: z.number(),
  width: z.number().optional(),
  height: z.number().optional(),
  points: z.array(z.object({ x: z.number(), y: z.number() })).optional(),
  backgroundColor: z.string().optional(),
  strokeColor: z.string().optional(),
  strokeWidth: z.number().optional(),
  roughness: z.number().optional(),
  opacity: z.number().optional(),
  text: z.string().optional(),
  label: z.object({
    text: z.string()
  }).optional(),
  fontSize: z.number().optional(),
  fontFamily: z.string().optional(),
  groupIds: z.array(z.string()).optional(),
  locked: z.boolean().optional()
});

/**
 * Schema for creating a new element
 * Can optionally include an ID for syncing purposes
 */
export const CreateElementSchema = z.object({
  id: z.string().optional()
}).merge(BaseElementPropertiesSchema);

/**
 * Schema for updating an existing element
 * ID is required, all other fields are optional
 */
export const UpdateElementSchema = z.object({
  id: z.string()
}).merge(BaseElementPropertiesSchema.partial());

/**
 * Schema for element ID parameter
 */
export const ElementIdSchema = z.object({
  id: z.string()
});

/**
 * Schema for multiple element IDs
 */
export const ElementIdsSchema = z.object({
  elementIds: z.array(z.string())
});

/**
 * Schema for group ID parameter
 */
export const GroupIdSchema = z.object({
  groupId: z.string()
});

/**
 * Schema for aligning elements
 */
export const AlignElementsSchema = z.object({
  elementIds: z.array(z.string()),
  alignment: z.enum(['left', 'center', 'right', 'top', 'middle', 'bottom'])
});

/**
 * Schema for distributing elements
 */
export const DistributeElementsSchema = z.object({
  elementIds: z.array(z.string()),
  direction: z.enum(['horizontal', 'vertical'])
});

/**
 * Schema for querying elements
 */
export const QuerySchema = z.object({
  type: z.enum(Object.values(EXCALIDRAW_ELEMENT_TYPES) as [ExcalidrawElementType, ...ExcalidrawElementType[]]).optional(),
  filter: z.record(z.any()).optional()
});

/**
 * Schema for resource types
 */
export const ResourceSchema = z.object({
  resource: z.enum(['scene', 'library', 'theme', 'elements'])
});

/**
 * Schema for Mermaid conversion
 */
export const MermaidConversionSchema = z.object({
  mermaidDiagram: z.string(),
  config: z.object({
    startOnLoad: z.boolean().optional(),
    flowchart: z.object({
      curve: z.enum(['linear', 'basis']).optional()
    }).optional(),
    themeVariables: z.object({
      fontSize: z.string().optional()
    }).optional(),
    maxEdges: z.number().optional(),
    maxTextSize: z.number().optional()
  }).optional()
});

/**
 * Schema for batch element creation
 */
export const BatchCreateElementsSchema = z.object({
  elements: z.array(BaseElementPropertiesSchema)
});
