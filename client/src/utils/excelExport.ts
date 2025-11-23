import * as XLSX from 'xlsx';
import { Node, Edge } from '@xyflow/react';

export const exportToExcel = (nodes: Node[], edges: Edge[], filename?: string): void => {
  try {
    // Create workbook
    const workbook = XLSX.utils.book_new();
    
    // Prepare nodes data
    const nodesData = nodes.map(node => ({
      'Node ID': node.id,
      'Type': node.data?.type || 'unknown',
      'Label': node.data?.label || node.id,
      'Position X': node.position.x,
      'Position Y': node.position.y,
      'Width': node.measured?.width || node.width || 'auto',
      'Height': node.measured?.height || node.height || 'auto',
      // Add type-specific data
      'Network': node.data?.network || '',
      'Cell Area': node.data?.['cell-area'] || '',
      'RRP': node.data?.rrp || node.data?.rrpId || '',
      'RRP Member': node.data?.rrpmember || '',
      'PLMN': node.data?.plmnValue || '',
      'S-NSSAI': node.data?.['s-nssai'] || '',
      'SD': node.data?.sd || '',
      'SST': node.data?.sst || '',
      'DNN': node.data?.dnn || node.data?.dnnId || '',
      'DNN Name': node.data?.dnnName || '',
      'QoS Flow': node.data?.qosflow || node.data?.qosFlowId || '',
      '5QI': node.data?.fiveqi || node.data?.fiveQIId || '',
      'Description': node.data?.description || ''
    }));
    
    // Prepare edges data
    const edgesData = edges.map(edge => ({
      'Edge ID': edge.id,
      'Source': edge.source,
      'Target': edge.target,
      'Source Handle': edge.sourceHandle || '',
      'Target Handle': edge.targetHandle || '',
      'Type': edge.type || 'default'
    }));
    
    // Create worksheets
    const nodesWorksheet = XLSX.utils.json_to_sheet(nodesData);
    const edgesWorksheet = XLSX.utils.json_to_sheet(edgesData);
    
    // Add worksheets to workbook
    XLSX.utils.book_append_sheet(workbook, nodesWorksheet, 'Nodes');
    XLSX.utils.book_append_sheet(workbook, edgesWorksheet, 'Edges');
    
    // Generate filename
    const exportFilename = filename 
      ? `${filename.replace(/\s+/g, '_')}_${Date.now()}.xlsx`
      : `graph_export_${Date.now()}.xlsx`;
    
    // Write file
    XLSX.writeFile(workbook, exportFilename);
    
    console.log(`✅ Excel export successful: ${exportFilename}`);
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    throw error;
  }
};
