import Loader from './Loader'

export default function Table({ columns, data, actions, loading = false }) {
	if (loading) {
		return <Loader />
	}

	return (
		<div className="glass-panel overflow-x-auto rounded-2xl">
			<table className="min-w-full divide-y divide-slate-200">
				<thead className="bg-slate-100/70">
					<tr>
						{columns.map((column) => (
							<th key={column.key} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
								{column.header}
							</th>
						))}
						{actions?.length ? (
							<th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">Action</th>
						) : null}
					</tr>
				</thead>
				<tbody className="divide-y divide-slate-100">
					{data.length ? (
						data.map((row) => (
							<tr key={row.id} className="transition hover:bg-[#f1f7ff]">
								{columns.map((column) => (
									<td key={`${row.id}-${column.key}`} className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">
										{column.render ? column.render(row[column.key], row) : row[column.key]}
									</td>
								))}
								{actions?.length ? (
									<td className="px-4 py-3 text-sm">
										<div className="flex items-center gap-2">
											{actions.map((action) => (
												<button
													key={action.label}
													type="button"
													onClick={() => action.onClick(row)}
													className={`inline-flex items-center rounded-md px-2 py-1.5 transition ${action.className || 'text-slate-600 hover:bg-slate-100'}`}
												>
													{action.icon}
													<span className="sr-only">{action.label}</span>
												</button>
											))}
										</div>
									</td>
								) : null}
							</tr>
						))
					) : (
						<tr>
							<td colSpan={columns.length + 1} className="px-4 py-10 text-center text-sm text-slate-500">
								No records found for this filter
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}

