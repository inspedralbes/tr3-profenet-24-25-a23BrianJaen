"use client"

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { TeacherProfileInfoProps } from "../types/types";
import { Mail as MailIcon } from '@mui/icons-material';
import { Avatar, Box, Card, CardContent, Typography, Tabs, Tab, Divider } from '@mui/material';

export default function ClientTeacherProfileProp({ dataTeacher }: TeacherProfileInfoProps) {
  const [mounted, setMounted] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const { theme, systemTheme } = useTheme();

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
      maxWidth: 'xl',
      mx: 'auto',
      mt: 4,
      bgcolor: isDark ? '#1e1e1e' : '#ffffff',
      color: isDark ? '#ffffff' : '#000000',
      border: isDark ? '1px solid #90caf9' : '1px solid #1976d2'
    }}>
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
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
                href={`mailto:${dataTeacher.email}`}
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
          <Box sx={{ mt: 2 }}>
            {/* {classes?.map((classItem) => (
              <Typography
                key={classItem.id}
                variant="body1"
                sx={{
                  color: isDark ? '#ffffff' : '#000000',
                  mb: 1,
                  p: 1,
                  borderRadius: 1,
                  '&:hover': {
                    bgcolor: isDark ? 'rgba(144, 202, 249, 0.08)' : 'rgba(25, 118, 210, 0.08)'
                  }
                }}
              >
                {classItem.name}
              </Typography>
            ))} */}

            {dataTeacher.courses.map((course) => (
              <Typography
                key={course.id}
                variant="body1"
                sx={{
                  color: isDark ? '#ffffff' : '#000000',
                  mb: 1,
                  p: 1,
                  borderRadius: 1,
                  '&:hover': {
                    bgcolor: isDark ? 'rgba(144, 202, 249, 0.08)' : 'rgba(25, 118, 210, 0.08)'
                  }
                }}
              >
                {course.name}
              </Typography>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}