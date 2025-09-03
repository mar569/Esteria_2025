import React, { useState, useEffect } from 'react';
import { Calendar, Users, TrendingUp, Clock, Phone, } from 'lucide-react';

interface Appointment {
  id: string;
  clientName: string;
  phone: string;
  service: string;
  preferredTime: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  comments?: string;
}

interface CRMStats {
  totalAppointments: number;
  pendingAppointments: number;
  completedThisMonth: number;
  revenue: number;
}

const CRMIntegration = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState<CRMStats>({
    totalAppointments: 0,
    pendingAppointments: 0,
    completedThisMonth: 0,
    revenue: 0
  });

  // Simulate CRM data loading
  useEffect(() => {
    // In production, this would fetch from your CRM API
    const mockAppointments: Appointment[] = [
      {
        id: '1',
        clientName: 'Елена Волкова',
        phone: '+7 (921) 123-45-67',
        service: 'Биовитализация',
        preferredTime: 'Утром (9:00 - 12:00)',
        status: 'pending',
        createdAt: '2025-01-27T10:30:00Z',
        comments: 'Первый раз, нужна консультация'
      },
      {
        id: '2',
        clientName: 'Мария Козлова',
        phone: '+7 (921) 987-65-43',
        service: 'Аугментация губ',
        preferredTime: 'Днем (12:00 - 16:00)',
        status: 'confirmed',
        createdAt: '2025-01-26T14:15:00Z'
      }
    ];

    setAppointments(mockAppointments);
    setStats({
      totalAppointments: 156,
      pendingAppointments: 8,
      completedThisMonth: 45,
      revenue: 680000
    });
  }, []);

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments(prev =>
      prev.map(apt => apt.id === id ? { ...apt, status } : apt)
    );
  };

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          CRM Dashboard - Beauty Clinic
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Всего записей</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalAppointments}</p>
              </div>
              <Calendar className="text-mint-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Ожидают подтверждения</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pendingAppointments}</p>
              </div>
              <Clock className="text-yellow-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Выполнено в этом месяце</p>
                <p className="text-2xl font-bold text-green-600">{stats.completedThisMonth}</p>
              </div>
              <Users className="text-green-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Доход в месяц</p>
                <p className="text-2xl font-bold text-mint-600">{stats.revenue.toLocaleString()} ₽</p>
              </div>
              <TrendingUp className="text-mint-500" size={32} />
            </div>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Последние заявки</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Клиент
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Услуга
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Время
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Статус
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {appointment.clientName}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Phone size={12} className="mr-1" />
                          {appointment.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{appointment.service}</div>
                      {appointment.comments && (
                        <div className="text-xs text-gray-500 mt-1">{appointment.comments}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {appointment.preferredTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                        {appointment.status === 'pending' && 'Ожидает'}
                        {appointment.status === 'confirmed' && 'Подтверждено'}
                        {appointment.status === 'completed' && 'Выполнено'}
                        {appointment.status === 'cancelled' && 'Отменено'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      {appointment.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                            className="text-green-600 hover:text-green-900"
                          >
                            Подтвердить
                          </button>
                          <button
                            onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                            className="text-red-600 hover:text-red-900"
                          >
                            Отменить
                          </button>
                        </>
                      )}
                      <a
                        href={`tel:${appointment.phone}`}
                        className="text-mint-600 hover:text-mint-900"
                      >
                        Позвонить
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRMIntegration;