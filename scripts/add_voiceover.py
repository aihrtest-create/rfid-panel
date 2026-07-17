import os
import subprocess
import static_ffmpeg

# Initialize static-ffmpeg to register ffmpeg paths
print("Initializing static-ffmpeg...")
static_ffmpeg.add_paths()

# Script text and exact timestamps in seconds from the latest run logs
voiceovers = [
    (0.0, "Приветствую! В этом видео мы подробно разберем три основных сценария работы кассира в RFID-панели Hello Park."),
    (6.2, "Начнем с первого визита гостя. Нажимаем кнопку Добавить аккаунт, чтобы зарегистрировать нового родителя."),
    (11.1, "Заполняем ФИО родителя."),
    (17.6, "Вводим номер телефона для верификации."),
    (23.3, "Отправляем проверочный СМС-код."),
    (27.6, "Вводим полученный код."),
    (31.8, "И подтверждаем номер телефона."),
    (36.1, "Добавляем новую строку для ребенка."),
    (40.5, "Указываем имя ребенка — Никита."),
    (45.3, "Заполняем дату его рождения."),
    (51.1, "Нажимаем Создать аккаунт. Окно привязки браслета открывается автоматически."),
    (56.8, "Прикладываем первый браслет к считывателю, и он автоматически привязывается к Никите. Профиль создан, ребенок может идти играть."),
    (64.8, "Перейдем ко второму сценарию — повторному визиту. Кассир вводит в поиск имя родителя и открывает список детей."),
    (73.3, "У Егора уже есть Аватар. Нажимаем кнопку Новый браслет."),
    (78.1, "Прикладываем новый браслет к считывателю. Он привязывается автоматически, перезаписывая Аватар на новый чип."),
    (86.0, "И третий сценарий — получение приза. Когда ребенок подходит к кассе, нажимаем кнопку Проверить браслет."),
    (92.0, "Прикладываем браслет к считывателю для проверки."),
    (98.2, "Открывается карточка аватара. Видим доступный приз Стикерпак, нажимаем кнопку и выдаем приз Егору."),
    (105.0, "Закрываем карточку аватара."),
    (109.6, "И очищаем строку поиска. Обслуживание гостя успешно завершено.")
]

# Paths
base_dir = "/Users/dima/Desktop/My project/Rfid-панель"
temp_dir = os.path.join(base_dir, "temp_audio")
os.makedirs(temp_dir, exist_ok=True)

video_in = os.path.join(base_dir, "Инструкция_Демонстрация.webm")
video_out = os.path.join(base_dir, "Инструкция_Демонстрация_Озвучено.mp4")

# 1. Generate individual AIFF files using macOS 'say' command
audio_files = []
for idx, (t_start, text) in enumerate(voiceovers):
    filename = f"part_{idx}.aiff"
    filepath = os.path.join(temp_dir, filename)
    print(f"Generating audio for part {idx} ({t_start}s) using Milena: '{text}'")
    
    # Use say command
    say_cmd = ['say', '-v', 'Milena', '-o', filepath, text]
    subprocess.run(say_cmd, check=True)
    audio_files.append((filepath, t_start))

# 2. Build the complex ffmpeg command to delay and mix audios
ffprobe_cmd = [
    'ffprobe', '-v', 'error', '-show_entries', 'format=duration',
    '-of', 'default=noprint_wrappers=1:nokey=1', video_in
]
try:
    duration_str = subprocess.check_output(ffprobe_cmd).decode('utf-8').strip()
    video_duration = float(duration_str)
except Exception as e:
    print(f"Failed to get video duration: {e}. Defaulting to 127 seconds.")
    video_duration = 127.0

print(f"Video duration is {video_duration} seconds.")

# Build inputs
inputs = ['-i', video_in]
filter_parts = []
mix_inputs = []

# Generate silent base audio trim to video duration
inputs += ['-f', 'lavfi', '-i', f'anullsrc=r=44100:cl=stereo']
filter_parts.append(f"[1:a]atrim=end={video_duration}[base]")
mix_inputs.append("[base]")

for idx, (filepath, t_start) in enumerate(audio_files):
    inputs += ['-i', filepath]
    input_idx = idx + 2
    delay_ms = int(t_start * 1000)
    filter_parts.append(f"[{input_idx}:a]adelay={delay_ms}|{delay_ms},aformat=sample_rates=44100:channel_layouts=stereo[a{idx}]")
    mix_inputs.append(f"[a{idx}]")

# Join delayed tracks
mix_str = "".join(mix_inputs)
filter_parts.append(f"{mix_str}amix=inputs={len(mix_inputs)}:normalize=0[out_audio]")

filter_complex = ";".join(filter_parts)

# Construct final ffmpeg command
ffmpeg_cmd = [
    'ffmpeg', '-y'
]
ffmpeg_cmd += inputs
ffmpeg_cmd += [
    '-filter_complex', filter_complex,
    '-map', '0:v',                # Map video stream from input 0
    '-map', '[out_audio]',        # Map mixed audio from filter complex
    '-c:v', 'libx264',            # Encode video to H.264
    '-pix_fmt', 'yuv420p',
    '-profile:v', 'high',         # Standard QuickTime profile
    '-level', '4.0',              # Standard level
    '-movflags', '+faststart',    # Relocate metadata index to start for QuickTime compatibility
    '-c:a', 'aac',                # Encode audio to AAC
    '-b:a', '192k',               # Audio bitrate
    '-shortest',                  # Finish when video ends
    video_out
]

print("Running FFMPEG command to stitch audio and video...")

result = subprocess.run(ffmpeg_cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
if result.returncode == 0:
    print(f"\nSUCCESS! Voiceover video saved to: {video_out}")
else:
    print(f"\nFFMPEG Error: {result.stderr.decode('utf-8')}")

# Clean up temp audio files
print("Cleaning up temporary audio files...")
for filepath, _ in audio_files:
    try:
        os.remove(filepath)
    except:
        pass
try:
    os.rmdir(temp_dir)
except:
    pass
