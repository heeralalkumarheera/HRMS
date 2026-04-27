import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EyeIcon, TrashIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import Table from '../components/common/Table'
import useDebounce from '../hooks/useDebounce'
import * as employeeService from '../services/employeeService'

export default function EmployeeList() {
  const navigate = useNavigate()

  const [employees, setEmployees] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const debouncedSearch = useDebounce(searchTerm)

  const fetchEmployees = async () => {
    setLoading(true)
    try {
      const data = await employeeService.getEmployees()
      setEmployees(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearch, rowsPerPage])

  const filteredEmployees = useMemo(
    () => employees.filter((item) => (
      item.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      || item.email.toLowerCase().includes(debouncedSearch.toLowerCase())
    )),
    [employees, debouncedSearch],
  )

  const totalPages = Math.max(1, Math.ceil(filteredEmployees.length / rowsPerPage))
  const paginatedData = filteredEmployees.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)

  const handleDelete = async (employee) => {
    const shouldDelete = window.confirm(`Delete ${employee.name}?`)
    if (!shouldDelete) return

    await employeeService.deleteEmployee(employee.id)
    toast.success('Employee deleted')
    fetchEmployees()
  }

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role' },
    { key: 'phone', header: 'Phone Number' },
    { key: 'joiningDate', header: 'Joining Date' },
  ]

  const actions = [
    {
      label: 'View',
      icon: <EyeIcon className="h-4 w-4" />,
      onClick: (row) => navigate(`/employee/${row.id}`),
      className: 'text-teal-700 hover:bg-teal-50',
    },
    {
      label: 'Delete',
      icon: <TrashIcon className="h-4 w-4" />,
      onClick: handleDelete,
      className: 'text-rose-700 hover:bg-rose-50',
    },
  ]

  return (
    <div className="space-y-5">
      <Card>
        <h1 className="page-title">Policy Advisor Directory</h1>
        <p className="page-subtitle mt-2">Manage broker profiles, contact channels, and onboarding records.</p>
      </Card>

      <Card>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div className="w-full max-w-sm">
            <Input
              label="Search"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          <Button onClick={() => navigate('/add-employee')}>Add New Advisor</Button>
        </div>
        <Table columns={columns} data={paginatedData} actions={actions} loading={loading} />

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <select
              className="rounded-lg border border-slate-300 bg-white px-2 py-1"
              value={rowsPerPage}
              onChange={(event) => setRowsPerPage(Number(event.target.value))}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            >
              Prev
            </Button>
            <span>Page {currentPage} of {totalPages}</span>
            <Button
              variant="outline"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
