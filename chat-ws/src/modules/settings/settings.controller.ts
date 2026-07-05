import type { Request, Response } from 'express'
import { fetchAllSettings, fetchSettingsNotification, updateUserSettings } from './settings.service.js'
import type { SettingsDto } from '../../models/dto/settings.dto.js'

export const getUserSettings = async (req: Request, res: Response) => {
  const { userId } = req.user
  const result = await fetchAllSettings(userId)
  return res.status(200).json(result)
}

export const getNotificationSettings = async (req: Request, res: Response) => {
  const { userId } = req.user
  const result = await fetchSettingsNotification(userId)
  return res.status(200).json(result)
}

export const updateNotificationSettings = async (req: Request, res: Response) => {
  const { userId } = req.user
  const settings = req.body as Partial<SettingsDto>
  const result = await updateUserSettings(userId, settings)
  return res.status(200).json(result)
}
