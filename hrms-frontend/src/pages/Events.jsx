import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import Card from '../components/common/Card'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import Modal from '../components/common/Modal'
import * as eventService from '../services/eventService'

const initialForm = { title: '', date: '', type: 'Meeting' }

const typeStyles = {
  Meeting: 'bg-cyan-100 text-cyan-700',
  Deadline: 'bg-rose-100 text-rose-700',
  Review: 'bg-amber-100 text-amber-700',
  Holiday: 'bg-emerald-100 text-emerald-700',
}

export default function Events() {
  const [events, setEvents] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)

  const numbers = useMemo(() => Array.from({ length: 154 }, (_, index) => index + 1), [])

  const fetchEvents = async () => {
    const data = await eventService.getEvents()
    setEvents(data)
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const createEvent = async () => {
    if (!form.title || !form.date || !form.type) {
      toast.error('Please fill all event fields')
      return
    }

    setLoading(true)
    try {
      await eventService.addEvent(form)
      toast.success('Event added')
      setForm(initialForm)
      setIsModalOpen(false)
      fetchEvents()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="glass-panel flex flex-wrap items-center justify-between gap-3 p-5 md:p-6">
        <div>
          <h1 className="page-title">Broker Calendar and Events</h1>
          <p className="page-subtitle mt-2">Coordinate reviews, policy deadlines, and branch activities from one timeline.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>Add Event</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id} hover>
            <h3 className="text-lg font-semibold text-slate-900">{event.title}</h3>
            <p className="mt-1 text-sm text-slate-500">{event.date}</p>
            <span className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-medium ${typeStyles[event.type] || 'bg-slate-100 text-slate-700'}`}>
              {event.type}
            </span>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-[#003566] via-[#00509d] to-[#1d70b8] text-white">
        <h3 className="mb-3 font-semibold text-white">Daily Follow-up Heatmap</h3>
        <div className="grid grid-cols-7 gap-2 sm:grid-cols-10 md:grid-cols-14">
          {numbers.map((num) => (
            <div key={num} className="rounded-md bg-white/15 px-2 py-1 text-center text-xs text-white/90">
              {num}
            </div>
          ))}
        </div>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={createEvent}
        title="Add Event"
      >
        <div className="space-y-3">
          <Input
            label="Title"
            value={form.title}
            onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
          />
          <Input
            label="Date"
            type="date"
            value={form.date}
            onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))}
          />
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Type</label>
            <select
              value={form.type}
              onChange={(event) => setForm((prev) => ({ ...prev, type: event.target.value }))}
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none transition focus:border-[#1d70b8] focus:ring-4 focus:ring-[#1d70b8]/15"
            >
              <option>Meeting</option>
              <option>Deadline</option>
              <option>Review</option>
              <option>Holiday</option>
            </select>
          </div>
          {loading ? <p className="text-sm text-slate-500">Saving...</p> : null}
        </div>
      </Modal>
    </div>
  )
}
