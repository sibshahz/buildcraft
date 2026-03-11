'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

interface StatusCellProps {
  rowData: {
    id: string
  }
  cellData: string
}

export const StatusCell: React.FC<StatusCellProps> = (props) => {
  const { rowData, cellData } = props
  const router = useRouter()
  
  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value
    try {
      const res = await fetch(`/api/contact-requests/${rowData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newValue,
        }),
      })
      
      if (res.ok) {
        // Refresh the page to show the updated status if needed, 
        // though the select value is already controlled by state/props in some cases.
        // In Payload 3, router.refresh() helps update the server-side data.
        router.refresh()
      }
    } catch (err) {
      console.error('Failed to update status', err)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return '#3b82f6' // blue
      case 'in-progress': return '#f59e0b' // amber
      case 'completed': return '#10b981' // green
      case 'rejected': return '#ef4444' // red
      default: return '#6b7280' // gray
    }
  }

  return (
    <div onClick={(e) => e.stopPropagation()} className="custom-status-cell">
      <select
        value={cellData || 'new'}
        onChange={handleChange}
        className="status-select"
        style={{
          padding: '4px 24px 4px 8px',
          borderRadius: '4px',
          border: `1px solid ${getStatusColor(cellData)}`,
          backgroundColor: '#fff',
          color: getStatusColor(cellData),
          fontSize: '12px',
          fontWeight: '600',
          cursor: 'pointer',
          appearance: 'none',
          backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 8px center',
        }}
      >
        <option value="new">New</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
        <option value="rejected">Rejected</option>
      </select>
    </div>
  )
}
