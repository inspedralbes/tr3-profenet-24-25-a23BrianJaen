"use client"

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { TeacherProfileInfoProps } from "../types/types";
import ModalCloneTeacher from './common/Modals/CloneModals/ModalCloneTeacher';
import { Mail as MailIcon } from '@mui/icons-material';
import { Avatar, Box, Card, CardContent, Typography, Tabs, Tab, Divider, Chip } from '@mui/material';
import ModalManageCoursesTeacher from './common/Modals/ManageModals/ModalManageCoursesTeacher';

export default function ClientTeacherProfileProp({ dataTeacher }: TeacherProfileInfoProps) {
  const [mounted, setMounted] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const { theme, systemTheme } = useTheme();
  const [isOpenModalClone, setIsOpenModalClone] = useState(false);
  const [isOpenModalManage, setIsOpenModalManage] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Making sure we have the right topic 
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  // Avoiding incorrect content flash
  if (!mounted) {
    return null;
  }

  return (
    <Card sx={{
      maxWidth: 'md',
      mx: 'auto',
      mt: 4,
      bgcolor: isDark ? '#1e1e1e' : '#ffffff',
      color: isDark ? '#ffffff' : '#000000',
      border: isDark ? '1px solid #90caf9' : '1px solid #1976d2'
    }}>
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', borderBottom: isDark ? '1px solid #90caf9' : '1px solid #1976d2' }}>
        <Avatar
          src={dataTeacher.profileimageurl || '/images/docent.png'}
          alt={`${dataTeacher.firstname} ${dataTeacher.lastname}`}
          sx={{ width: 72, height: 72, mr: 2 }}
        >
          {dataTeacher.firstname[0]}{dataTeacher.lastname[0]}
        </Avatar>
        <Box>
          <Typography variant="h5" sx={{ color: isDark ? '#ffffff' : '#000000' }}>
            {dataTeacher.firstname} {dataTeacher.lastname}
          </Typography>
        </Box>
        {/* Add Clona Button */}
        <Box className="md:ml-auto flex flex-col md:flex-row gap-3">
          {/* Clone button */}
          <button
            className="border border-gray-300 px-2 py-1 md:px-4 md:py-2 rounded-lg cursor-pointer"
            onClick={() => setIsOpenModalClone(true)}
          >
            Clona
          </button>

          <ModalCloneTeacher isOpen={isOpenModalClone} onClose={() => setIsOpenModalClone(false)} teacher={dataTeacher} courses={dataTeacher.courses} />

          {/* Manage classes */}
          <button
            className="border border-gray-300 px-2 py-1 md:px-4 md:py-2 rounded-lg cursor-pointer"
            onClick={() => setIsOpenModalManage(true)}
          >
            Desubscriure&apos;s de les Classes
          </button>

          <ModalManageCoursesTeacher isOpen={isOpenModalManage} onClose={() => setIsOpenModalManage(false)} teacher={dataTeacher} courses={dataTeacher.courses} />
        </Box>

      </Box>

      <Divider />

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        sx={{
          '& .MuiTab-root': {
            color: isDark ? '#b3b3b3' : '#666666',
            '&.Mui-selected': {
              color: isDark ? '#90caf9' : '#1976d2'
            }
          },
          '& .MuiTabs-indicator': {
            backgroundColor: isDark ? '#90caf9' : '#1976d2'
          }
        }}>
        <Tab label="Informació" />
        <Tab label="Assignatures" />
      </Tabs>

      <CardContent sx={{ minHeight: '200px' }}>
        {tabValue === 0 && (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ color: isDark ? '#ffffff' : '#000000' }}>
              Informació de Contacte
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <MailIcon sx={{ mr: 1, color: isDark ? '#90caf9' : '#1976d2' }} />
              <Typography
                component="a"
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${dataTeacher.email}`}
                target='_blank'
                sx={{
                  color: isDark ? '#90caf9' : '#1976d2',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                {dataTeacher.email}
              </Typography>
            </Box>
          </Box>
        )}
        {tabValue === 1 && (
          <Box className="flex flex-wrap gap-2">
            {dataTeacher.courses.map((course) => (
              <Chip
                label={course?.name}
                key={course.id}
                sx={{
                  color: isDark ? '#ffffff' : '#000000',
                  mb: 1,
                  p: 1,
                  borderRadius: 1,
                  background: isDark ? '#151515' : '#E2E2E2',
                  '&:hover': {
                    bgcolor: isDark ? 'rgba(144, 202, 249, 0.12)' : 'rgba(25, 118, 210, 0.12)'
                  }
                }}
              />
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}