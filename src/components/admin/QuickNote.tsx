'use client'
import React, { useState } from 'react'
import { useField, useForm, Button, useDocumentInfo } from '@payloadcms/ui'

export const QuickNote: React.FC = () => {
  const { id } = useDocumentInfo()
  const { value: notes, setValue } = useField<any[]>({ path: 'internalNotes' })
  const { submit } = useForm()
  const [newNote, setNewNote] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    if (!newNote.trim() || isSaving) return
    setIsSaving(true)

    try {
      const currentNotes = Array.isArray(notes) ? notes : []
      
      // We don't need to specify date and author here because 
      // the collection schema has defaultValues for them.
      // Payload will apply those when we save the document.
      const updatedNotes = [
        ...currentNotes,
        {
          note: newNote,
        },
      ]

      await setValue(updatedNotes)
      
      // In Payload 3.0, we can trigger a form submission
      await submit()
      
      setNewNote('')
    } catch (error) {
      console.error('Error saving note:', error)
      alert('Failed to save note. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  if (!id) return null // Only show on existing documents

  return (
    <div className="field-type text" style={{ marginBottom: '2rem', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: '8px', backgroundColor: '#f8fafc' }}>
      <label className="field-label" style={{ marginBottom: '0.5rem', display: 'block', fontWeight: 'bold', color: '#000' }}>
        Quick Add Note
      </label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Enter internal follow-up notes here..."
            style={{
                width: '100%',
                minHeight: '100px',
                padding: '0.75rem',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontSize: '14px',
                fontFamily: 'inherit',
                resize: 'vertical',
                backgroundColor: '#fff',
                color: '#000'
            }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
                buttonStyle="primary"
                onClick={handleSave}
                disabled={isSaving || !newNote.trim()}
                type="button"
                size="small"
            >
                {isSaving ? 'Adding...' : 'Add & Save Note'}
            </Button>
        </div>
      </div>
    </div>
  )
}
