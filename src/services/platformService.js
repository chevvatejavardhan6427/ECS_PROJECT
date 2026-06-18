import {
  adminAnalytics,
  adminUsers,
  awarenessContent,
  bloodBanks,
  camps,
  currentUser,
  defaultCenter,
  donors,
  emergencyRequests,
  hospitals,
  notifications,
  overviewStats,
  quotes,
} from '../data/mockData';
import { apiRequest } from './api';

const withFallback = async (request, fallbackFactory) => {
  try {
    return await request();
  } catch {
    return fallbackFactory();
  }
};

const filterDonors = ({ bloodGroup, radius = 10 }) =>
  donors.filter((donor) => (!bloodGroup || donor.bloodGroup === bloodGroup) && donor.distanceKm <= Number(radius));

export const getOverview = () =>
  withFallback(
    () => apiRequest('/platform/overview'),
    () => ({ stats: overviewStats, quotes, spotlightDonors: donors.slice(0, 3), camps: camps.slice(0, 2) })
  );

export const getDashboard = (token, { bloodGroup, radius, lat, lng }) =>
  withFallback(
    () =>
      apiRequest(
        `/platform/dashboard?bloodGroup=${bloodGroup || ''}&radius=${radius || 10}&lat=${lat || defaultCenter.lat}&lng=${lng || defaultCenter.lng}`,
        { token }
      ),
    () => ({
      user: currentUser,
      stats: overviewStats,
      nearbyDonors: filterDonors({ bloodGroup, radius }),
      emergencyRequests: emergencyRequests.slice(0, 2),
      camps: camps.slice(0, 2),
      notifications,
      quotes,
    })
  );

export const getNearbyDonors = ({ token, bloodGroup, radius = 10, lat, lng }) =>
  withFallback(
    () =>
      apiRequest(
        `/donors/nearby?bloodGroup=${bloodGroup || ''}&radius=${radius}&lat=${lat || defaultCenter.lat}&lng=${lng || defaultCenter.lng}`,
        { token }
      ),
    () => ({
      donors: filterDonors({ bloodGroup, radius }),
      hospitals,
      bloodBanks,
    })
  );

export const toggleAvailability = (token, isAvailable) =>
  withFallback(
    () => apiRequest('/donors/availability', { method: 'PATCH', token, body: { isAvailable } }),
    () => ({ user: { ...currentUser, isAvailable } })
  );

export const getCamps = () =>
  withFallback(
    () => apiRequest('/camps'),
    () => ({ camps })
  );

export const registerForCamp = (token, campId) =>
  withFallback(
    () => apiRequest(`/camps/${campId}/register`, { method: 'POST', token }),
    () => ({ message: 'Camp registration saved locally for preview mode.' })
  );

export const getAwareness = () =>
  withFallback(
    () => apiRequest('/platform/awareness'),
    () => awarenessContent
  );

export const pledgeOrganDonation = (token, payload) =>
  withFallback(
    () => apiRequest('/pledges', { method: 'POST', token, body: payload }),
    () => ({ message: 'Preview pledge captured locally.' })
  );

export const getEmergencyRequests = ({ token, lat, lng }) =>
  withFallback(
    () => apiRequest(`/emergency/nearby?lat=${lat || defaultCenter.lat}&lng=${lng || defaultCenter.lng}`, { token }),
    () => ({ requests: emergencyRequests })
  );

export const createEmergencyRequest = (token, payload) =>
  withFallback(
    () => apiRequest('/emergency', { method: 'POST', token, body: payload }),
    () => ({ request: { ...payload, id: `preview-${Date.now()}`, status: 'Open' }, message: 'Preview request created.' })
  );

export const getNotifications = (token) =>
  withFallback(
    () => apiRequest('/notifications', { token }),
    () => ({ notifications })
  );

export const markNotificationRead = (token, id) =>
  withFallback(
    () => apiRequest(`/notifications/${id}/read`, { method: 'PATCH', token }),
    () => ({ success: true })
  );

export const getAdminSnapshot = (token) =>
  withFallback(
    () => apiRequest('/admin/analytics', { token }),
    () => ({ analytics: adminAnalytics, users: adminUsers, camps, flaggedRequests: emergencyRequests.filter((item) => item.isFlagged) })
  );

export const approveCamp = (token, campId) =>
  withFallback(
    () => apiRequest(`/admin/camps/${campId}/approve`, { method: 'PATCH', token }),
    () => ({ message: 'Camp approval saved locally for preview mode.' })
  );

export const removeUser = (token, userId) =>
  withFallback(
    () => apiRequest(`/admin/users/${userId}`, { method: 'DELETE', token }),
    () => ({ message: 'User removal saved locally for preview mode.' })
  );
